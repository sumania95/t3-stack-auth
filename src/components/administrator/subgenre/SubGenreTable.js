import Link from 'next/link';
import { toast } from 'react-toastify';
import { trpc } from "../../../utils/trpc";


const SubGenreTable = ({items}) => {
    const utils = trpc.useContext();
    const updateSubGenre = trpc.subgenre.delete.useMutation({
        onSettled:()=>{
        utils.subgenre.getAll.invalidate();
        toast.warning(`Sub Genre successfully deleted`);
        }
    });
    const handleDelete = (id) =>{
        updateSubGenre.mutate({
            id: id
        });
        utils.subgenre.getAll.invalidate();
    }
    return(
        <>
            {items?.map((item, i) => (
                <tr className="bg-white border-b" key={item.id}>
                    <th className=" w-1/12 py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                        {i+1}
                    </th>
                    <td className=" w-5/12 py-4 px-6">
                        {item.sub_genre}
                    </td>
                    <td className=" w-5/12 py-4 px-6">
                        {item.genre.genre}
                    </td>
                    <td className="py-4 px-6">
                    <Link href={`/administrator/sub-genre/${item.id}`} className="font-medium text-blue-600">Edit</Link>
                    <button onClick={()=>handleDelete(item.id)} className="font-medium text-blue-600">Remove</button>
                    </td>
                </tr>
            ))}
        </>

    )
}

export default SubGenreTable;