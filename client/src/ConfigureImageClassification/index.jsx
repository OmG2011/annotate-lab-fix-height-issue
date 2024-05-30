// @flow
import React, { useMemo } from "react"
import Survey from "material-survey/components/Survey"
import { setIn } from "seamless-immutable"
import { CssBaseline, GlobalStyles } from "@mui/material";

const form = {
  questions: [
    {
      name: "multiple",
      title: "Allow multiple classifications per image?",
      type: "boolean",
      isRequired: true
    },
    {
      name: "labels",
      title: "Labels",
      description: "Classifications or tags to be labeled.",
      type: "matrixdynamic",
      columns: [
        { cellType: "text", name: "id", title: "id" , isRequired: true},
        {
          cellType: "text",
          name: "description",
          title: "Description (optional)",
        },
      ],
    },
    {
        name: "regions",
        title: "Choose annotation tool (default).",
        type: "dropdown",
        choices: [
            "Polygon",
            "Bounding Box",
            "Point",
          ],
    }
  ],
}

export default ({ config, onChange }) => {
  const defaultAnswers = useMemo(
    () => ({
      multiple: config.multiple ? config.multiple : false,
      labels:
        (config.labels || []).map((a) => {
          return typeof a === "string" ? { id: a, description: a } : a
        }) || [],
        regions: config.regions ? config.regions : "Polygon"
    }),
    [config.labels, config.multiple]
  )
  return (
    <>
      <CssBaseline />
      <GlobalStyles styles={{
        '.MuiSelect-select.MuiSelect-outlined': {
          height: '2.2rem !important',
          minHeight: '2.2rem !important',
          lineHeight: '2.2rem !important',
        },
        '.MuiSelect-select.MuiSelect-outlined > div': {
            paddingTop: '0px !important',
          },
        '.MuiInputBase-input.MuiOutlinedInput-input': {
          height: '2.2rem !important',
          minHeight: '2.2rem !important',
          lineHeight: '2.2rem !important',
        },
        '.MuiOutlinedInput-root': {
          height: '2.2rem !important',
          minHeight: '2.2rem !important',
          lineHeight: '2.2rem !important',
        }
      }} />
   
        <Survey
        noActions
        variant="flat"
        defaultAnswers={defaultAnswers}
        onQuestionChange={(questionId, newValue) => {
            var arrayId = []
            if (Array.isArray(newValue))
            newValue = newValue.filter((json) => {
                if (arrayId.includes(json.id)) return false
                arrayId.push(json.id)
                return true
            })
            onChange(setIn(config, [questionId], newValue))
        }}
        form={form}
        />
    </>
  )
}
