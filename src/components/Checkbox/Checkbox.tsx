import { Checkbox as CheckboxComponent } from '@mui/material'
import { memo, useEffect, useRef } from 'react'

interface ICheckbox {
	indeterminate?: boolean
	checked: boolean
	onChange: (event: unknown) => void
}

export const Checkbox = memo(
	({ indeterminate, checked, onChange }: Readonly<ICheckbox>) => {
		const ref = useRef<HTMLInputElement>(null)

		useEffect(() => {
			if (ref?.current?.indeterminate && typeof indeterminate === 'boolean') {
				ref.current.indeterminate = !checked && indeterminate
			}
		}, [ref, indeterminate, checked])

		return (
			<CheckboxComponent
				sx={{
					'&.Mui-checked': {
						color: '#29cd83',
					},
					'&.MuiCheckbox-indeterminate': {
						color: '#29cd83',
					},
				}}
				inputRef={ref}
				indeterminate={indeterminate}
				checked={checked}
				onChange={onChange}
			/>
		)
	}
)
