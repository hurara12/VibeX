import { Button } from '@/shadcn-components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shadcn-components/ui/card'
import { Input } from '@/shadcn-components/ui/input'
import { Label } from '@/shadcn-components/ui/label'
import { TabsContent } from '@/shadcn-components/ui/tabs'
import React from 'react'

function  Activity() {
  return (
    
    <TabsContent value="activity">
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>
          You Can Track Your Entire VibeX Activity Here.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="Pedro Duarte" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input id="username" defaultValue="@peduarte" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  </TabsContent>
  )
}

export default Activity;