import { Typography, Box, Button } from "@mui/material"

interface RecommendationBoxProps {
  title: string
  toggleRecommendation: (type: string) => void
}

const RecommendationBox = ({
  title,
  toggleRecommendation,
}: RecommendationBoxProps) => {
  return (
    <Box
      sx={{
        m: 0.5,
        backgroundSize: "cover",
      }}
    >
      <Button
        sx={{
          flex: 1,
          p: {
            xs: 2,
            sm: 4,
          },
          backgroundColor: "rgba(255,255,255,0.30)",
        }}
        onClick={() => toggleRecommendation(title)}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: {
              xs: 8,
              sm: 20,
            },
          }}
        >
          {title}
        </Typography>
      </Button>
    </Box>
  )
}

export default RecommendationBox
