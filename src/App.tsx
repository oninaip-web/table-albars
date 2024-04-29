import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { columns } from './components/Columns/Columns'
import Pagination from './components/Pagination/Pagination'
import dataJson from './data.json'
import './index.css'
import { IUser } from './typing'
import { getCommonPinningStyles } from './utils/getCommonPinningStyles'

export default function App() {
	const [data] = useState<IUser[]>(dataJson.data)

	const table = useReactTable({
		data,
		columns: columns as ColumnDef<IUser, any>[],
		initialState: {
			columnPinning: {
				left: ['check-box'],
				right: ['actions'],
			},
			pagination: {
				pageSize: 25,
			},
		},

		columnResizeMode: 'onChange',
		getSubRows: (row: any) => row.healthChecks,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
	})

	return (
		<div className='container'>
			<div className='table-wrapper'>
				<table>
					<thead>
						{table.getHeaderGroups().map(headerGroup => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<th
											key={header.id}
											colSpan={header.colSpan}
											style={{
												width: `${header.getSize()}px`,
												...getCommonPinningStyles(header.column),
											}}
										>
											{header.isPlaceholder ? null : (
												<div>
													{flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
												</div>
											)}
											<button
												className='resizer'
												onMouseDown={header.getResizeHandler()}
												onTouchStart={header.getResizeHandler()}
											/>
										</th>
									)
								})}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map(row => {
							return (
								<tr
									key={row.id}
									className={row.getIsExpanded() ? 'expanded' : ''}
								>
									{row.getVisibleCells().map(cell => {
										return (
											<td
												key={cell.id}
												style={{
													...getCommonPinningStyles(cell.column),
												}}
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</td>
										)
									})}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
			<Pagination totalCount={dataJson.totalCount} table={table} />
		</div>
	)
}
