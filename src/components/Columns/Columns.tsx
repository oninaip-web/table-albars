import { ColumnDef } from '@tanstack/react-table'
import { ReactNode } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6'
import { IoReload } from 'react-icons/io5'
import { IHealthChecks, ISortedData } from '../../typing'
import { Checkbox } from '../Checkbox/Checkbox'
import Popover from '../Popover/Popover'
import { Status } from '../Status/Status'

export const columns: ColumnDef<ISortedData & IHealthChecks>[] = [
	{
		id: 'check-box',
		size: 30,
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllRowsSelected()}
				indeterminate={table.getIsSomeRowsSelected()}
				onChange={table.getToggleAllRowsSelectedHandler()}
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				indeterminate={row.getIsSomeSelected()}
				onChange={row.getToggleSelectedHandler()}
			/>
		),
	},
	{
		accessorFn: row => row.fullName || row.title,
		id: 'fullName',
		header: () => 'Full name / Health check',
		cell: ({ row, getValue }) => (
			<div className='flex'>
				<div>
					{row.original.healthChecks?.length > 0 ? (
						<button
							onClick={row.getToggleExpandedHandler()}
							style={{ cursor: 'pointer' }}
						>
							{row.getIsExpanded() ? <FaAngleUp /> : <FaAngleDown />}
						</button>
					) : (
						<span style={{ marginLeft: '25px' }}></span>
					)}
				</div>
				<div
					style={{ fontWeight: row.parentId === undefined ? 'bold' : '400' }}
				>
					{getValue() as ReactNode}
				</div>
			</div>
		),
	},
	{
		accessorFn: row => row.code,
		id: 'code',
		header: () => 'Code',
	},
	{
		accessorFn: row => row.expiredDate,
		id: 'expiredDate',
		header: () => 'Expiration',
	},
	{
		accessorFn: row => row.status,
		id: 'status',
		header: () => 'Status',
		cell: ({ getValue }) => {
			const value = getValue() as string
			return value?.length > 0 ? <Status label={value} /> : ''
		},
	},
	{
		accessorKey: 'department',
		header: 'Department',
		cell: info => info.getValue(),
	},
	{
		accessorKey: 'userStatus',
		header: 'User status',
		cell: ({ getValue }) => {
			const value = getValue() as string
			return value?.length > 0 ? <Status label={value} /> : ''
		},
	},
	{
		accessorKey: 'jobTitle',
		header: 'Job title',
		cell: info => info.getValue(),
	},
	{
		id: 'actions',
		size: 30,
		header: () => (
			<button onClick={() => {}}>
				<IoReload />
			</button>
		),
		cell: () => (
			<Popover content={'Text'} variant='text'>
				...
			</Popover>
		),
	},
]
