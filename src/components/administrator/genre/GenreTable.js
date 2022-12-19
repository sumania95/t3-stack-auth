import Link from 'next/link';
import { toast } from 'react-toastify';
import { trpc } from "../../../utils/trpc";

const GenreTable = ({items}) => {
    const utils = trpc.useContext();
    const updateSubGenre = trpc.genre.delete.useMutation({
        onSuccess: () => {
            toast.warning(`Genre successfully deleted`);
        },
        onSettled:()=>{
            utils.genre.getAll.invalidate();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
    const handleDelete = (id) =>{
        updateSubGenre.mutate({
            id
        })
    }
    return (
        <>
            {items?.map((item, i) => (
                <tr className="bg-white border-b" key={item.id}>
                    <th className=" w-1/12 py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                        {i+1}
                    </th>
                    <td className=" w-10/12 py-4 px-6">
                        {item.genre}
                    </td>
                    <td className="py-4 px-6">
                    <Link href={`/administrator/genre/${item.id}`} className="font-medium text-blue-600">Edit</Link>
                    <button onClick={()=>handleDelete(item.id)} className="font-medium text-blue-600">Remove</button>
                    </td>
                </tr>
            ))}
        </>
    
    )

}

export default GenreTable;