import Link from 'next/link';
import { toast } from 'react-toastify';
import { trpc } from "../../../utils/trpc";
import stream from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';
import ReactAudioPlayer from 'react-audio-player';

const pipeline = promisify(stream.pipeline);
const UserTable = ({items,indexOfFirstPost}) => {
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

    const handler = async (req, res) => {
        const response = await fetch(url); // replace this with your API call & options
        if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
      
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=dummy.pdf');
        await pipeline(response.body, res);
      };
    return (
        <>
        {items?.map((item, i) => (
            <tr className="bg-white border" key={item.id}>
                <td className='w-10 p-2'><ReactAudioPlayer
                                        src={item.publishedLowBitRateFile.url}
                                        
                                        controls
                                        /></td>
                <td className="p-2">
                    {item.formattedName}<br/>
                    {item.waveformImageFileName.split('.').slice(0, -1).join('.')}
                </td>
                <td className=" w-40 p-2 space-x-2">
                    <Link href={`/administrator/genre/${item.id}`} className="font-medium text-blue-600 hover:bg-blue-600 hover:text-white active:bg-opacity-80 p-2 border">Edit</Link>
                    <button onClick={()=>handleDelete(item.id)} className="font-medium text-rose-600 hover:bg-rose-600 hover:text-white active:bg-opacity-80 p-2 border">Remove</button>
                    <button className="font-medium text-rose-600 hover:bg-rose-600 hover:text-white active:bg-opacity-80 p-2 border"
                    onClick={()=>{
                        fetch(`https://crooklynclanv2prod.s3.amazonaws.com/tracks/draft/hi_bit_rate/${item.waveformImageFileName.split('.').slice(0, -1).join('.')}.mp3`,
                        {
                        method: 'GET',
                        responseType: 'application/json',
                        }).then(response => {
                        if (response.status !== 200) {
                            throw new Error('Sorry, I could not find that file.');
                        }
                        return response.blob();
                        }).then(blob => {
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.style.display = 'none';
                        a.href = url;
                        a.setAttribute('download', `${item.artistPrimaryName}-${item.formattedName}.mp3`);
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(url);
                    })}}
                    >Download</button>
                </td>
            </tr>
        ))}     
        </>
    
    )

}

export default UserTable;