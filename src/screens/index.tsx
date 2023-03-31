import { Preload } from "@true/components"
import { useTheme } from "@true/global"
import { memoForwardRef } from "@true/utils"
import React from "react"

export const PreloadScreen = memoForwardRef(() => {
  const theme = useTheme()
  return <Preload title={"Example"} subtitle={"subtitle"}/>
})
