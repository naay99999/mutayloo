import { ChartAreaInteractive } from './_components/chart-area-interactive'
import { DataTable } from './_components/data-table'
import { SectionCards } from './_components/section-cards'
import { Toaster } from '@workspace/ui/components/sonner'
import data from './data.json'

export function Component() {
  return (
    <>
      <p className="px-4 text-sm text-muted-foreground lg:px-6">
        Preview dashboard — metrics and documents use sample data.
      </p>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
      <Toaster />
    </>
  )
}
