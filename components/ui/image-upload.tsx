'use client';

import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
        setLoading(true);
        const file = acceptedFiles[0];
        if (!file) return;

        // Check file size (4MB limit)
        if (file.size > 4 * 1024 * 1024) {
            alert('File is too large. Maximum size is 4MB.');
            setLoading(false);
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64String = event.target?.result as string;
            onChange(base64String);
            setLoading(false);
        };
        reader.onerror = () => {
            alert('Failed to read file.');
            setLoading(false);
        };
        reader.readAsDataURL(file);
    } catch (error) {
        console.error(error);
        alert('Something went wrong with the upload.');
        setLoading(false);
    }
  }, [onChange]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif', '.webp'],
      'video/*': ['.mp4', '.webm']
    },
    maxFiles: 1,
    disabled: disabled || loading
  });

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden bg-gray-100">
            <div className="z-10 absolute top-2 right-2">
              <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            {/* Simple check for video: if it starts with 'data:video' or ends with video extension */}
            {(url.startsWith('data:video') || url.match(/\.(mp4|webm)$/i)) ? (
                 <video src={url} className="object-cover w-full h-full" controls />
            ) : (
                <Image
                  fill
                  className="object-cover"
                  alt="Image"
                  src={url}
                />
            )}
          </div>
        ))}
      </div>
      <div
        {...getRootProps()}
        className="border-dashed border-2 border-neutral-300 p-10 rounded-md flex flex-col justify-center items-center gap-4 text-neutral-500 hover:opacity-75 transition cursor-pointer"
      >
        <input {...getInputProps()} />
        <ImagePlus className="w-10 h-10" />
        <p>{loading ? 'Uploading...' : 'Drag & drop or click to upload'}</p>
      </div>
    </div>
  );
}

export default ImageUpload;
