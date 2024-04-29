import { Column } from '@tanstack/react-table'
import { CSSProperties } from 'react'
import { IUser } from '../typing'

export const getCommonPinningStyles = (
	column: Column<IUser>
): CSSProperties => {
	const isPinned = column.getIsPinned()

	return {
		left: isPinned === 'left' ? 0 : undefined,
		right: isPinned === 'right' ? 0 : undefined,
		position: isPinned ? 'sticky' : 'relative',
		width: column.getSize(),
		zIndex: isPinned ? 1 : 0,
	}
}
