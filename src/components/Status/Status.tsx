import { Chip } from '@mui/material'

interface Props {
	label: string
}

const getColor = (label: string) => {
	switch (label) {
		case 'Valid':
			return 'success'
		case 'Expired':
			return 'error'
		case 'Canceled':
			return 'default'
		case 'Active':
			return 'success'
		default:
			return 'default'
	}
}

export function Status({ label }: Readonly<Props>) {
	return <Chip color={getColor(label)} label={label} size='small' />
}
