import { Box, Stack, Typography } from "@mui/material"

interface RouteTitleProps {
  title: string
  subtitle: string
  buttons?: Array<JSX.Element>
}

const RouteHeader = ({ title, subtitle, buttons }: RouteTitleProps) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        mb: 3,
        width: "100%",
        flexDirection: {
          xs: "column",
          md: "row",
        },
      }}
    >
      <Box sx={{ mr: { xs: 2, sm: 6 } }}>
        <Typography
          variant="h2"
          color="white"
          sx={{
            fontWeight: 500,
            fontSize: {
              xs: 30,
              sm: 60,
            },
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="white"
          sx={{
            fontSize: {
              xs: 10,
              sm: 16,
            },
          }}
        >
          {subtitle}
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>{buttons?.map((Btn) => Btn)}</Box>
    </Stack>
  )
}

export default RouteHeader
