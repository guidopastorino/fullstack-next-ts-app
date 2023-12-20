import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { BsPenFill } from 'react-icons/bs'
import { RxCross2 } from "react-icons/rx";
import ReactDOM from 'react-dom'

interface Post {
    userID: string;
    description: string;
    files: File[];
}


// for file blob url (files state)
interface FileObject {
    fileName: string;
    type: string;
    url: string;
}

const MakePost = () => {
    const MenuRef = useRef<HTMLDivElement | null>(null);
    const ButtonRef = useRef<HTMLButtonElement | null>(null);
    const FormRef = useRef<HTMLFormElement | null>(null);

    const [makePost, setMakePost] = useState<boolean>(false)

    // ObjectURL (blob) files url
    const [files, setFiles] = useState<FileObject[]>([]);

    useEffect(() => {
        console.log("files", files)
    }, [files])

    const [post, setPost] = useState<Post>({
        userID: "656aac316955c6229fc41a7a",
        description: "",
        files: []
    })

    useEffect(() => console.log(post), [post])

    useEffect(() => {
        const element = document.querySelector("#_next")

        if (element) {
            if (makePost) {
                element.classList.add("brightness-50", "pointer-events-none")
            } else {
                element.classList.remove("brightness-50", "pointer-events-none")
            }
        }

        if (!makePost) {
            setPost({
                ...post,
                description: "",
                files: []
            })

            setFiles([])
        }
    }, [makePost])

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (e.target === ButtonRef.current) return;
            if (makePost && MenuRef.current) {
                if (!MenuRef.current.contains(e.target as Node)) {
                    setMakePost(false);
                }
            }
        };

        document.addEventListener("mousedown", handler);

        return () => document.removeEventListener("mousedown", handler);
    });


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("description", post.description)

        post.files.forEach(el => {
            formData.append("files", el)
        })

        //submit
        fetch('/api/posts', { method: 'POST', body: JSON.stringify(post), headers: { "Content-Type": "multipart/formdata" } })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files) {
            let filesObjArray: FileObject[] = [];

            const filesArray = Array.from(files);

            setPost({
                ...post,
                files: filesArray
            })

            for (let i = 0; i < filesArray.length; i++) {
                let fileType = filesArray[i].type;
                let fileName = filesArray[i].name;
                let fileURL = URL.createObjectURL(filesArray[i]);

                let fileUrlObj = { fileName, type: fileType, url: fileURL };

                filesObjArray.push(fileUrlObj);
            }

            setFiles(filesObjArray)
        }
    };

    return (
        <>
            <button ref={ButtonRef} onClick={() => setMakePost(true)} className='p-4 w-full text-lg flex justify-center items-center my-4 text-white bg-neutral-800 rounded-full hover:bg-neutral-700 duration-100'>
                <BsPenFill />
            </button>

            {makePost && ReactDOM.createPortal(
                <div ref={MenuRef} className='border w-full rounded-md max-h-96 h-[80vh] max-w-screen-sm bg-white fixed top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]'>
                    <div className='flex justify-between items-center p-3 border-b'>
                        <span className="font-medium">Make post</span>
                        <button className="w-10 h-10 hover:bg-gray-200 active:bg-gray-300 rounded-full duration-200 flex justify-center items-center" onClick={() => setMakePost(false)}><RxCross2 /></button>
                    </div>
                    <form ref={FormRef} className='w-full p-3' onSubmit={e => handleSubmit(e)}>
                        <textarea onChange={e => {
                            setPost({
                                ...post,
                                [e.target.name]: e.target.value
                            })
                        }} autoComplete='off' placeholder='Post description' name="description" className='w-full p-2 border border-black border-1 rounded-md text-md resize-none h-36 overflow-y-auto'></textarea>

                        <div>
                            <input onChange={e => handleFiles(e)} type="file" name="files" placeholder="files" accept='image/*, video/*' multiple />
                            <button type='button' onClick={() => FormRef?.current?.files.click()} className='bg-neutral-800 hover:bg-neutral-700 text-white py-2 px-3 w-max font-medium text-xs rounded-full duration-100'>Select files</button>

                            <button type='submit' className='bg-neutral-800 hover:bg-neutral-700 text-white py-2 px-3 w-max font-medium text-xs rounded-full duration-100'>Submit</button>
                        </div>

                        {!!files && <div className='w-full overflow-y-hidden overflow-x-auto flex justify-start items-center gap-3'>
                            {files.map((el, i) => (
                                <div className='w-20 h-20 overflow-hidden' key={i}>
                                    {
                                        el.type.startsWith("image")
                                            ? <img className='w-full h-full object-contain' src={el.url} alt={el.fileName} title={el.fileName} />
                                            : <video className='w-full h-full object-cover' muted autoPlay src={el.url} title={el.fileName}></video>
                                    }
                                </div>
                            ))}
                        </div>}
                    </form>
                </div>,
                document.body
            )}
        </>
    )
}

export default MakePost