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
        m: 1,
        backgroundSize: "cover",
      }}
    >
      <Button
        sx={{
          flex: 1,
          p: 8,
          backgroundColor: "rgba(255,255,255,0.30)",
        }}
        onClick={() => toggleRecommendation(title)}
      >
        <Typography variant="h6">{title}</Typography>
      </Button>
    </Box>
  )
}

export default RecommendationBox
