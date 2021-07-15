import Image from 'next/image'
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { SubscribeModal } from './SubscribeModal'
const HeroBanner: React.FC = () => {
  return (
    <Flex
      w={'full'}
      h={'100vh'}
      backgroundImage={'url(./bg.jpg)'}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
    >
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}
      >
        <Stack
          maxW={'2xl'}
          align={'flex-start'}
          spacing={6}
          p={18}
          bgColor="rgba(255, 190, 255, 0.15)"
          backdropFilter="blur(5px)"
          borderRadius="md"
        >
          <Text
            color="gray.300"
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}
          >
            Keep track of the last hundred trade comic paperback releases from
            Marvel
          </Text>
          <Stack direction={'row'}>
            <SubscribeModal />
            <Button
              bg={'whiteAlpha.300'}
              rounded={'full'}
              color={'white'}
              _hover={{ bg: 'whiteAlpha.500' }}
              onClick={() => window.open('https://www.marvel.com')}
            >
              Go to Marvel
            </Button>
          </Stack>
          <Box
            position="absolute"
            right={{ base: '0px', md: '-20px', lg: '-130px' }}
            bottom={{ base: '50px', md: '0px', lg: '0px' }}
            w={{ base: '100px', md: '200px', lg: '200px' }}
            h={{ base: '50px', md: '100px', lg: '100px' }}
          >
            <Box position="absolute">
              <Image
                src="/tag.svg"
                alt="Tag"
                width="200px"
                height="100px"
                className="tag"
              />
            </Box>
            <Box
              as="div"
              position="absolute"
              marginTop={{ base: '10px', md: '25px', lg: '25px' }}
              marginLeft={{ base: '17px', md: '50px', lg: '50px' }}
              w={{ base: '80px', md: '130px', lg: '130px' }}
              h={{ base: '32px', md: '52px', lg: '52px' }}
              className="img-tag"
            >
              <Image src="/logo.svg" alt="Marvel" width="100%" height="100%" />
            </Box>
          </Box>
        </Stack>
      </VStack>
      <Box w="100%" position="fixed" color={'gray.400'} textAlign="right" zIndex="2" p="10px" bgColor="gray.800" bottom="0">
        P.S. this site is for testing purposes only, the information is taken
        from the
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://developer.marvel.com"
        >
          developer.marvel.com
        </a>
      </Box>
    </Flex>
  )
}

export { HeroBanner }
