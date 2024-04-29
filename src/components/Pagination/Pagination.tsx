import { Table } from '@tanstack/react-table'
import { useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { FaArrowTurnDown } from 'react-icons/fa6'
import './Pagination.style.css'

interface Props {
	totalCount: number
	table: Table<any>
}

export function Pagination(props: Readonly<Props>) {
	const { totalCount, table } = props

	const [pageIndex, setPageIndex] = useState(1)

	return (
		<div className='flex pagination'>
			<div className='flex justify-space-between'>
				<div className='padding-20'>
					<strong>Total:</strong> {totalCount}
				</div>
				<div className='pages'>
					<div>
						<span>Page </span>
						<strong>
							{table.getState().pagination.pageIndex + 1} /{' '}
							{table.getPageCount()}
						</strong>
					</div>
					<div className='arrows'>
						<button
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							<BsArrowLeft />
						</button>
						<button
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							<BsArrowRight />
						</button>
					</div>
				</div>
				<div className='jump-block'>
					<strong>Jump to:</strong>
					<form
						onSubmit={e => {
							e.preventDefault()
							table.setPageIndex(pageIndex)
						}}
					>
						<input
							type='number'
							className='input'
							min={1}
							max={table.getPageCount()}
							defaultValue={pageIndex}
							onChange={e => {
								const index = e.target.value ? Number(e.target.value) - 1 : 0
								setPageIndex(index)
							}}
						/>
						<button disabled={table.getPageCount() < 2} type='submit'>
							<FaArrowTurnDown className='icon' />
						</button>
					</form>
				</div>
			</div>
			<div className='page-size'>
				<strong>Show: </strong>
				{[25, 50, 100].map(item => {
					return (
						<button
							key={item}
							className={`${
								table.getState().pagination.pageSize === item ? 'checked' : ''
							} page-size-button`}
							onClick={() => {
								table.setPageSize(item)
							}}
						>
							{item}
						</button>
					)
				})}
			</div>
		</div>
	)
}

export default Pagination
