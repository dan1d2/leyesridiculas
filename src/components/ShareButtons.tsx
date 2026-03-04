import { HStack, IconButton, Tooltip, useToast } from '@chakra-ui/react';
import { FaTwitter, FaFacebook, FaWhatsapp, FaLink } from 'react-icons/fa';

interface ShareButtonsProps {
  ley: {
    id: string;
    nombre: string;
    numero: string;
  };
}

const ShareButtons = ({ ley }: ShareButtonsProps) => {
  const toast = useToast();
  const url = typeof window !== 'undefined' 
    ? `${window.location.origin}/ley/${ley.id}`
    : `https://leyesobsoletas.vercel.app/ley/${ley.id}`;
  
  const shareText = `Mirá esta ley obsoleta argentina: "${ley.nombre}" (${ley.numero}) - Leyes Obsoletas de Argentina`;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(shareText);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: '¡Enlace copiado!',
      description: 'El enlace se copió al portapapeles',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <HStack spacing={2}>
      <Tooltip label="Compartir en Twitter" placement="top">
        <IconButton
          aria-label="Twitter"
          icon={<FaTwitter />}
          onClick={() => window.open(
            `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
            '_blank'
          )}
          colorScheme="twitter"
          size="sm"
          variant="outline"
        />
      </Tooltip>
      
      <Tooltip label="Compartir en Facebook" placement="top">
        <IconButton
          aria-label="Facebook"
          icon={<FaFacebook />}
          onClick={() => window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            '_blank'
          )}
          colorScheme="facebook"
          size="sm"
          variant="outline"
        />
      </Tooltip>
      
      <Tooltip label="Compartir en WhatsApp" placement="top">
        <IconButton
          aria-label="WhatsApp"
          icon={<FaWhatsapp />}
          onClick={() => window.open(
            `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
            '_blank'
          )}
          colorScheme="whatsapp"
          size="sm"
          variant="outline"
        />
      </Tooltip>
      
      <Tooltip label="Copiar enlace" placement="top">
        <IconButton
          aria-label="Copiar enlace"
          icon={<FaLink />}
          onClick={handleCopyLink}
          size="sm"
          variant="outline"
        />
      </Tooltip>
    </HStack>
  );
};

export default ShareButtons;