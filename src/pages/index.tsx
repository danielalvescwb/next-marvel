import Image from 'next/image'
import { GetStaticProps } from 'next'
import axios from 'axios'
import { Box, Badge, Button, Center, Grid, SimpleGrid } from '@chakra-ui/react'

import { HeroBanner } from '../components/HeroBanner'
import { GitHubCorner } from '../components/GitHubCorner'
import { SEO } from '../components/SEO'

interface IData {
  results: IItems[]
}
interface IItems {
  thumbnail: string
  title: string
  formattedPrice: string
  isbn: string
  ean: string
  onsaleDate: string
  urlDetail: string
}

export default function Home({ results }: IData) {
  const title = 'Comics'
  const description =
    'Keep track of the last hundred trade comic paperback releases from Marvel'
  return (
    <>
      <SEO title={title} description={description} image="bg_share.jpg" />
      <GitHubCorner projectUrl="https://github.com/danielalvescwb/next-marvel" />
      <HeroBanner />
      <SimpleGrid
        minChildWidth={{ base: '300px', md: '400px', lg: '400px' }}
        spacing={4}
        p={5}
      >
        {results.map(
          (
            {
              thumbnail,
              title,
              formattedPrice,
              isbn,
              ean,
              onsaleDate,
              urlDetail,
            },
            i,
          ) => (
            <Box
              key={i}
              maxW="sm"
              borderWidth="2px"
              borderColor="gray.600"
              borderRadius="sm"
              overflow="hidden"
              bgColor="gray.100"
              backgroundImage={thumbnail}
              backgroundRepeat="no-repeat"
              backgroundSize={'cover'}
              minW="100%"
            >
              <Grid
                templateColumns="150px 1fr"
                backdropFilter="blur(20px)"
                minH="100%"
              >
                <Center
                  d="flex"
                  alignItems="center"
                  p={4}
                  minW="150px"
                  maxW="150px"
                >
                  <Image
                    src={thumbnail}
                    alt={title}
                    width="150px"
                    height="255px"
                  />
                </Center>

                <Box pr={3} pb={3} pl={3} bgColor="gray.800" opacity="0.7">
                  <Box
                    mt="4"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    color="gray.50"
                  >
                    {title}
                  </Box>
                  <Box
                    mt="3"
                    mb="3"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    color="gray.400"
                  >
                    Published: {onsaleDate}
                  </Box>
                  <Box d="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="gray">
                      isbn
                    </Badge>
                    <Box
                      color="gray.300"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                      ml="2"
                    >
                      {isbn}
                    </Box>
                  </Box>
                  <Box d="flex" alignItems="baseline" mt={2}>
                    <Badge borderRadius="full" px="2" colorScheme="gray">
                      ean
                    </Badge>
                    <Box
                      color="gray.300"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                      ml="2"
                    >
                      {ean}
                    </Box>
                  </Box>
                  <Box
                    d="flex"
                    alignItems="center"
                    mt={5}
                    justifyContent="space-around"
                  >
                    <Box color="gray.50" fontWeight="bold">
                      Price: {formattedPrice}
                    </Box>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => window.open(urlDetail)}
                    >
                      Buy
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Box>
          ),
        )}
      </SimpleGrid>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const startDate = new Date()
  startDate.setFullYear(startDate.getFullYear() - 1)
  const startDateConvert = startDate.toLocaleString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const endDate = new Date()
  const endDateConvert = endDate.toLocaleString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const response = await axios.get(
    `https://gateway.marvel.com/v1/public/comics?apikey=f665a11830708931d24d3fc92b98ca14&hash=c424a7a02c759274c0a9735706d4fa85&ts=1626127723800&format=trade%20paperback&orderBy=-onsaleDate&limit=100&offset=0&dateRange=${startDateConvert},${endDateConvert}`,
  )

  let results = []
  response.data.data.results.map((item) => {
    const [filterDates] = item.dates.filter(({ type }) => type === 'onsaleDate')
    const resOnsaleDate = new Date(filterDates.date)
    const onsaleDate = resOnsaleDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })

    const [filterUrls] = item.urls.filter(({ type }) => type === 'detail')

    results.push({
      title: item.title,
      thumbnail: `${item.thumbnail.path}/portrait_xlarge.${item.thumbnail.extension}`,
      isbn: item.isbn,
      ean: item.ean,
      formattedPrice: item.prices[0].price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
      onsaleDate,
      urlDetail: filterUrls.url,
    })
  })

  return {
    props: {
      results,
    },
    revalidate: 60 * 60,
  }
}
