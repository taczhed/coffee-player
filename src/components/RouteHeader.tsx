import { Box, Stack, Typography } from "@mui/material"

interface RouteTitleProps {
  title: string
  subtitle: string
  buttons?: Array<JSX.Element>
}

const RouteHeader = ({ title, subtitle, buttons }: RouteTitleProps) => {
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
      <Box sx={{ mr: 6 }}>
        <Typography variant="h2" color="white" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="white">
          {subtitle}
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>{buttons?.map((Btn) => Btn)}</Box>
    </Stack>
  )
}

export default RouteHeader
