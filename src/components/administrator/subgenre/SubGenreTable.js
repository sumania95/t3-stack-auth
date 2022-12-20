import Link from 'next/link';
import { toast } from 'react-toastify';
import { trpc } from "../../../utils/trpc";


const SubGenreTable = ({items,isLoading,indexOfFirstPost}) => {
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
    return (
        <>
        {isLoading?
            <tr className='border w-full'>
                <td colSpan={12} className="text-center w-full p-4">
                    Loading.....
                </td>
            </tr>
        :
        <>
            {items?.length?
             <>
                {items?.map((item, i) => (
                <tr className="bg-white border" key={item.id}>
                    <td className='w-10 p-2'>{indexOfFirstPost + i + 1}</td>
                    <td className="p-2">
                        {item.sub_genre} 
                    </td>
                    <td className="p-2">
                        {item.genre.genre} 
                    </td>
                    <td className=" w-40 p-2 space-x-2">
                        <Link href={`/administrator/sub-genre/${item.id}`} className="font-medium text-blue-600 p-2 border">Edit</Link>
                        <button onClick={()=>handleDelete(item.id)} className="font-medium text-rose-600 p-2 border">Remove</button>
                    </td>
                </tr>
            ))}
             </>
            :
            <tr className='border'>
                <td colSpan={12} className="text-center w-full p-4">No record found</td>
            </tr>
            }
            
        </>
        }
        </>
    
    )

}

export default SubGenreTable;