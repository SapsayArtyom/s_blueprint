import type { FC } from 'react'

interface IOptions {
    label: string
    value: string
}
 
interface DropdownProps {
	className?: string
	label: string, 
	value: string, 
	options: IOptions[], 
	onChange: (val: string) => void
}
 
const Dropdown: FC<DropdownProps> = ({ className, label, value, options, onChange }) => {
	return (
		<div className={className}>
			<label>
				{label}
				<select 
					value={value} 
					onChange={(event) => onChange(event.target.value)} 
					className='text-[#000] ml-[10px] bg-white rounded-[3px]'>
					{options.map((option, index) => (
						<option key={index} value={option.value}>{option.label}</option>
					))}
				</select>
			</label>
		</div>
	)
}
 
export default Dropdown