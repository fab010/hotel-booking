import Container from '@/components/container';
import { Loader2 } from 'lucide-react';

const  Loading = () => {
  return (
    <Container>
    <Loader2
      className='my-28 h-16 w-16 text-primary/60 animate-spin'
    />
    </Container>
  );
  
};

export default Loading;