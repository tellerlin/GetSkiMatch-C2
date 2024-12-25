import Image from 'next/image';

interface ResortImageProps {
  imageUrl: string;
  name: string;
}

export default function ResortImage({ imageUrl, name }: ResortImageProps) {
  return (
    <div className="relative h-48 bg-gray-200">
      <Image
        src={imageUrl || '/images/placeholder.jpg'}
        alt={`View of ${name} ski resort`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-opacity duration-300"
        loading="lazy"
      />
    </div>
  );
}