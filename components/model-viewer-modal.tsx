'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Box } from 'lucide-react'

// Dynamically import the 3D viewer with no SSR
const ModelViewer3D = dynamic(
  () => import('@/components/model-viewer-3d').then((mod) => ({ default: mod.ModelViewer3D })),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[70vh] min-h-[500px] max-h-[800px] bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden flex items-center justify-center">
        <div className="text-white">Loading 3D viewer...</div>
      </div>
    )
  }
)

interface ModelViewerModalProps {
  modelUrl: string
  bodyName: string
  trigger?: React.ReactNode
}

export function ModelViewerModal({
  modelUrl,
  bodyName,
  trigger,
}: ModelViewerModalProps) {
  const [open, setOpen] = useState(false)

  if (!modelUrl) {
    return null
  }

  const defaultTrigger = (
    <Button variant="outline" size="sm" className="gap-2">
      <Box className="h-4 w-4" />
      View 3D Model
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{bodyName} - 3D Model</DialogTitle>
          <DialogDescription>
            Interactive 3D model of {bodyName}. Rotate, zoom, and pan to explore.
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 pb-6 overflow-hidden">
          {open && <ModelViewer3D modelUrl={modelUrl} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}

