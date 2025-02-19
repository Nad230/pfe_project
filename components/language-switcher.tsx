"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useI18n } from "@/lib/i18n/context"
import { useIntl } from "react-intl"

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  const intl = useIntl()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLocale("en")}>
          {intl.formatMessage({ id: "language.english" })}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale("ar-TN")}>
          {intl.formatMessage({ id: "language.arabic" })}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}