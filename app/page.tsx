"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle, Calendar, Users, Settings } from "lucide-react"
import EventList from "@/components/event-list"
import EventForm from "@/components/event-form"
import UserList from "@/components/user-list"
import UserForm from "@/components/user-form"
import { ThemeToggle } from "@/components/theme-toggle"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const [activeTab, setActiveTab] = useState("events")
  const [showEventForm, setShowEventForm] = useState(false)
  const [showUserForm, setShowUserForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const { toast } = useToast()

  const handleCreateEvent = () => {
    setEditingEvent(null)
    setShowEventForm(true)
  }

  const handleCreateUser = () => {
    setEditingUser(null)
    setShowUserForm(true)
  }

  const handleEditEvent = (event) => {
    setEditingEvent(event)
    setShowEventForm(true)
  }

  const handleEditUser = (user) => {
    setEditingUser(user)
    setShowUserForm(true)
  }

  const handleEventFormClose = () => {
    setShowEventForm(false)
    setEditingEvent(null)
  }

  const handleUserFormClose = () => {
    setShowUserForm(false)
    setEditingUser(null)
  }

  const handleEventSave = (eventData) => {
    toast({
      title: editingEvent ? "Evento atualizado" : "Evento criado",
      description: `${eventData.name} foi ${editingEvent ? "atualizado" : "criado"} com sucesso.`,
    })
    setShowEventForm(false)
    setEditingEvent(null)
  }

  const handleUserSave = (userData) => {
    toast({
      title: editingUser ? "Usuário atualizado" : "Usuário criado",
      description: `${userData.name} foi ${editingUser ? "atualizado" : "criado"} com sucesso.`,
    })
    setShowUserForm(false)
    setEditingUser(null)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-6 py-4 border-b">
          <h1 className="text-3xl font-bold text-primary">EventHub</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="default">Login</Button>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Eventos
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Usuários
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Configurações
              </TabsTrigger>
            </TabsList>

            {activeTab === "events" && (
              <Button onClick={handleCreateEvent} className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Novo Evento
              </Button>
            )}
            {activeTab === "users" && (
              <Button onClick={handleCreateUser} className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Novo Usuário
              </Button>
            )}
          </div>

          <TabsContent value="events" className="space-y-4">
            {showEventForm ? (
              <EventForm event={editingEvent} onSave={handleEventSave} onCancel={handleEventFormClose} />
            ) : (
              <EventList onEdit={handleEditEvent} />
            )}
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            {showUserForm ? (
              <UserForm user={editingUser} onSave={handleUserSave} onCancel={handleUserFormClose} />
            ) : (
              <UserList onEdit={handleEditUser} />
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Configurações do Sistema</h2>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <h3 className="text-lg font-medium">API Backend</h3>
                  <p className="text-muted-foreground">
                    Endpoint da API Java: <code className="bg-muted p-1 rounded">http://localhost:8080/api</code>
                  </p>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-lg font-medium">Versão</h3>
                  <p className="text-muted-foreground">EventHub v1.0.0</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </main>
  )
}

