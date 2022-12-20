import Link from 'next/link';
import { toast } from 'react-toastify';
import { trpc } from "../../../utils/trpc";

const GenreTable = ({items,isLoading,indexOfFirstPost}) => {
    const utils = trpc.useContext();
    const updateGenre = trpc.genre.delete.useMutation({
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
        updateGenre.mutate({
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
                <tr className="bg-white border" key={item.id}>
                    <td className='w-10 p-2'>{indexOfFirstPost+ i +1}</td>
                    <td className="p-2">
                        {item.genre} 
                    </td>
                    <td className=" w-40 p-2 space-x-2">
                        <Link href={`/administrator/genre/${item.id}`} className="font-medium text-blue-600 hover:bg-blue-600 hover:text-white active:bg-opacity-80 p-2 border">Edit</Link>
                        <button onClick={()=>handleDelete(item.id)} className="font-medium text-rose-600 hover:bg-rose-600 hover:text-white active:bg-opacity-80 p-2 border">Remove</button>
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