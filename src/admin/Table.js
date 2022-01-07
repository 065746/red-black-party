function Table(props) {
    const {headData, renderHead, bodyData, renderBody} = props
    return (
        <div>
            <div className="overflow-y-auto">
                <table className="w-full min-w-[400px] ">
                    {headData && renderHead && (
                        <thead className="bg-gray-100 ">
                            <tr className="text-left">
                                {headData.map((item, index) => renderHead(item, index))}
                            </tr>
                        </thead>
                    )}
                    {bodyData && renderBody && (
                        <>
                            <tbody>
                                {bodyData?.map((item, index) => renderBody(item, index))}
                            </tbody> 
                        </>
                        )
                    }
                </table>
            </div>
        </div>
    )
}

export default Table
