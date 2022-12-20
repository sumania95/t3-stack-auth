import Link from 'next/link';
import { toast } from 'react-toastify';
import { trpc } from "../../../utils/trpc";

const GenreTable = ({items,isLoading}) => {
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
                <tr className="bg-white border-b" key={item.id}>
                    <td colSpan={10} className="py-2 px-6">
                        {item.genre}
                    </td>
                    <td colSpan={2} className="flex space-x-2">
                        <Link href={`/administrator/genre/${item.id}`} className="font-medium text-blue-600">Edit</Link>
                        <button onClick={()=>handleDelete(item.id)} className="font-medium text-blue-600">Remove</button>
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

export default GenreTable;