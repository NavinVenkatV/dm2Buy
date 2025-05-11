
function UseCase({title, content} : {
    title : string,
    content : string
}) {
    return (
        <div>
            <div className='bg-neutral-800 p-5 w-auto md:w-[500px] rounded-2xl text-white mt-7 md:mt-0'>
                <p className='text-2xl font-bold'>{title}</p>
                <p className='mt-5'>{content}</p>
            </div>
        </div>
    )
}

export default UseCase
