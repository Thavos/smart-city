type ticket = {
    id: string
    comment:string
    status: boolean
    price:string
    time: string
}

export default function MyServiceTickets (){
    const myTickets = [];
    return(
        <div>
            <table>
                <tr>
                    <td>Id</td>
                    <td>Price</td>
                    <td>Time</td>
                    <td>Status</td>
                    <td>Action</td>
                </tr>
            </table>
        </div>
    )
}