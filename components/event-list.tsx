"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash2, Users, Calendar, MapPin } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Mock data - would be fetched from your Java backend
const mockEvents = [
  {
    id: 1,
    name: "Workshop de React",
    description: "Aprenda React do zero ao avançado com especialistas.",
    date: "2023-12-15T09:00:00",
    location: "São Paulo, SP",
    category: "Tecnologia",
    capacity: 50,
    registered: 32,
    organizer: "Tech Academy",
  },
  {
    id: 2,
    name: "Festival de Música",
    description: "O maior festival de música eletrônica do Brasil.",
    date: "2023-12-20T18:00:00",
    location: "Rio de Janeiro, RJ",
    category: "Música",
    capacity: 5000,
    registered: 3750,
    organizer: "Sound Productions",
  },
  {
    id: 3,
    name: "Conferência de Marketing Digital",
    description: "Estratégias avançadas de marketing para 2024.",
    date: "2024-01-10T10:00:00",
    location: "Belo Horizonte, MG",
    category: "Marketing",
    capacity: 200,
    registered: 150,
    organizer: "Marketing Pro",
  },
  {
    id: 4,
    name: "Feira Gastronômica",
    description: "Experimente os melhores pratos da culinária internacional.",
    date: "2024-01-15T11:00:00",
    location: "Curitiba, PR",
    category: "Gastronomia",
    capacity: 1000,
    registered: 800,
    organizer: "Food Lovers",
  },
  {
    id: 5,
    name: "Maratona de Programação",
    description: "Desafie suas habilidades de programação em equipe.",
    date: "2024-02-05T08:00:00",
    location: "Recife, PE",
    category: "Tecnologia",
    capacity: 100,
    registered: 75,
    organizer: "Code Masters",
  },
]

const categories = ["Todos", "Tecnologia", "Música", "Marketing", "Gastronomia", "Esportes", "Educação"]

export default function EventList({ onEdit }) {
  const [events, setEvents] = useState(mockEvents)
  const [filteredEvents, setFilteredEvents] = useState(mockEvents)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("Todos")
  const { toast } = useToast()

  useEffect(() => {
    // Filter events based on search term and category
    let filtered = events

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (categoryFilter !== "Todos") {
      filtered = filtered.filter((event) => event.category === categoryFilter)
    }

    setFilteredEvents(filtered)
  }, [searchTerm, categoryFilter, events])

  const handleDelete = (id) => {
    // In a real app, you would call your API to delete the event
    setEvents(events.filter((event) => event.id !== id))
    toast({
      title: "Evento excluído",
      description: "O evento foi excluído com sucesso.",
    })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar eventos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Nenhum evento encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge variant="outline" className="mb-2">
                    {event.category}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(event)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir evento</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir o evento "{event.name}"? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(event.id)}
                            className="bg-destructive text-destructive-foreground"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <CardTitle className="line-clamp-1">{event.name}</CardTitle>
                <CardDescription className="line-clamp-2">{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {event.registered} / {event.capacity} participantes
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="default" className="w-full">
                  Inscrever-se
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

