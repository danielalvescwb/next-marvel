import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

export function SubscribeModal(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit } = useForm()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  async function handleSubscribe(data) {
    setIsLoading(true)
    const { email } = data
    localStorage.setItem('@marvel-next:email', email)
    const sendSubscribe = await axios.post(
      `./api/handleSubscriptioin`,
      {
        email,
      },
    )
    const { error, message } = sendSubscribe.data
    if (error) {
      toast({
        title: 'Subscription',
        description: message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      })
    } else {
      toast({
        title: 'Subscription',
        description: message,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      })
    }
    setIsLoading(false)
    onClose()
  }

  return (
    <>
      <Button
        // bg={'blue.400'}
        rounded={'full'}
        // color={'white'}
        // _hover={{ bg: 'blue.500' }}
        onClick={onOpen}
        colorScheme="red"
      >
        Subscribe
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'5xl'}>
        <ModalOverlay />
        <ModalContent
          backgroundImage={'url(./modal.jpg)'}
          backgroundSize={'cover'}
          backgroundPosition={'top center'}
          borderWidth="2px"
          borderColor="gray.600"
          borderRadius="sm"
        >
          <ModalHeader color={'gray.200'}>Subscribe</ModalHeader>
          <ModalCloseButton color={'gray.200'} />
          <ModalBody color={'gray.200'}>
            Subscribe to receive more news
            <Box as="form" onSubmit={handleSubmit(handleSubscribe)}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <InputGroup size="md">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    {...register('email')}
                    required
                  />
                  <InputRightElement width="8rem">
                    <Button
                      width="8rem"
                      type="submit"
                      size="md"
                      colorScheme="green"
                      isLoading={isLoading}
                      loadingText="Submitting"
                    >
                      Submit
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter color={'gray.200'}>
           P.S. this site is for testing purposes only, the information is taken from the
           <a target="_blank" rel="noopener noreferrer" href="http://developer.marvel.com">developer.marvel.com</a>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
