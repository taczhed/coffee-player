import { Typography, Box, Button } from "@mui/material"

interface RecommendationBoxProps {
  title: string
  bgc: string
  toggleRecommendation: (type: string) => void
}

const RecommendationBox = ({
  title,
  bgc,
  toggleRecommendation,
}: RecommendationBoxProps) => {
  return (
    <Button
      sx={{
        flex: 1,
        py: 8,
        m: 1,
        backgroundColor: bgc,
      }}
      onClick={() => toggleRecommendation(title)}
    >
      <Typography variant="h6">{title}</Typography>
    </Button>
  )
}

export default RecommendationBox
