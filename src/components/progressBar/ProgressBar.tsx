import { FC } from 'react'
 
interface ProgressBarProps {
    className?: string
    progress: number
    text?: boolean
}
 
const ProgressBar: FC<ProgressBarProps> = ({ className, progress, text }) => {
    return (
        <div className={'flex flex-col items-center justify-center w-[100%]'}>
            <div className={'w-[100%] h-[13px] bg-[#8b8b8b] rounded-[12px] relative overflow-hidden flex items-center justify-center font-bold'}>
                <div className='absolute left-0 h-[100%] rounded-[12px]' style={{width: `${progress}%`, backgroundImage: 'linear-gradient(to left, #884185, #2F5294)'}}>
                </div>
                <p className='text-[10px] z-10 stroke-[#000] stroke-1'>{progress}%</p>
            </div>
        </div>
    )
}
 
export default ProgressBar