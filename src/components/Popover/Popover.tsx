import { Button, Popover as PopoverComponent, Typography } from '@mui/material'
import { ReactNode, useState } from 'react'

interface IPopover {
	content: ReactNode
	children: ReactNode
	variant: 'contained' | 'outlined' | 'text'
}

function Popover({ content, children, variant }: Readonly<IPopover>) {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const open = Boolean(anchorEl)
	const id = open ? 'simple-popover' : undefined

	return (
		<>
			<Button
				aria-describedby={id}
				variant={variant}
				size='small'
				onClick={handleClick}
				sx={{ minWidth: '20px' }}
			>
				{children}
			</Button>
			<PopoverComponent
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Typography sx={{ p: 2 }}>{content}</Typography>
			</PopoverComponent>
		</>
	)
}

export default Popover
