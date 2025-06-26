'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
}

export const FileUpload = ({ onChange, value }: FileUploadProps) => {
  const fileType = value?.split('.').pop()
  
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data?.data?.secure_url) {
        onChange(data.data.secure_url);
      } else {
        console.error('Upload failed:', data);
      }
    } catch (error) {
      console.error('Upload Error:', error);
    } finally {
      setUploading(false);
    }
  };

  if(value && fileType !== 'pdf'){
    return (
      <div className="relative h-20 w-20">
        <Image 
        fill
        src={value}
        alt="Upload"
        className='rounded-full'
        />
        <button
        onClick={() => onChange('')}
        className='bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm'
        type='button'
        >
          <X className='h-4 w-4' />
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {value && (
        <div className="w-32 h-32 border rounded-md overflow-hidden">
          <img src={value} alt="Uploaded file" className="object-cover w-full h-full" />
        </div>
      )}
      <input
        type="file"
        ref={inputRef}
        onChange={handleUpload}
        accept="image/*,application/pdf"
        className="hidden"
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>
    </div>
  );
};
