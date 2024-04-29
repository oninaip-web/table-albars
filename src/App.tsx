import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { columns } from './components/Columns/Columns'
import Pagination from './components/Pagination/Pagination'
import dataJson from './data.json'
import './index.css'
import { ISortData, IUser } from './typing'
import { getCommonPinningStyles } from './utils/getCommonPinningStyles'

const sortingData = (data: IUser[]) => {
	const sortedData = data.reduce((acc, cur) => {
		const i = acc.findIndex(
			(item: { personalCode: string }) => item.personalCode === cur.personalCode
		)

		if (i >= 0) {
			acc[i].data.push(cur)
			return acc
		}

		return [...acc, { personalCode: cur.personalCode, data: [cur] }]
	}, [] as ISortData[])

	return sortedData.map(item => {
		return {
			fullName: item.data.map(item => item.fullName)[0],
			department: item.data.map(item => item.department)[0],
			userStatus: item.data.map(item => item.userStatus)[0],
			jobTitle: item.data.map(item => item.jobTitle)[0],
			healthChecks: item.data.map(item => ({
				title: item.title,
				code: item.code,
				expiredDate: item.expiredDate,
				status: item.status,
			})),
		}
	})
}

export default function App() {
	const [data] = useState<IUser[]>(dataJson.data)
	const table = useReactTable({
		data: useMemo(() => sortingData(data), [data]),
		columns: columns as ColumnDef<any>[],
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
				<table style={{ width: table.getTotalSize() }}>
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
