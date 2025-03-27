"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash2, Mail } from "lucide-react"
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data - would be fetched from your Java backend
const mockUsers = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@example.com",
    role: "admin",
    createdAt: "2023-01-15",
    eventsCreated: 12,
    eventsParticipating: 3,
  },
  {
    id: 2,
    name: "Maria Oliveira",
    email: "maria.oliveira@example.com",
    role: "organizador",
    createdAt: "2023-02-20",
    eventsCreated: 8,
    eventsParticipating: 5,
  },
  {
    id: 3,
    name: "Pedro Santos",
    email: "pedro.santos@example.com",
    role: "participante",
    createdAt: "2023-03-10",
    eventsCreated: 0,
    eventsParticipating: 10,
  },
  {
    id: 4,
    name: "Ana Costa",
    email: "ana.costa@example.com",
    role: "organizador",
    createdAt: "2023-04-05",
    eventsCreated: 5,
    eventsParticipating: 7,
  },
  {
    id: 5,
    name: "Lucas Ferreira",
    email: "lucas.ferreira@example.com",
    role: "participante",
    createdAt: "2023-05-12",
    eventsCreated: 0,
    eventsParticipating: 15,
  },
]

const roles = ["Todos", "admin", "organizador", "participante"]

export default function UserList({ onEdit }) {
  const [users, setUsers] = useState(mockUsers)
  const [filteredUsers, setFilteredUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("Todos")
  const { toast } = useToast()

  useEffect(() => {
    // Filter users based on search term and role
    let filtered = users

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (roleFilter !== "Todos") {
      filtered = filtered.filter((user) => user.role === roleFilter)
    }

    setFilteredUsers(filtered)
  }, [searchTerm, roleFilter, users])

  const handleDelete = (id) => {
    // In a real app, you would call your API to delete the user
    setUsers(users.filter((user) => user.id !== id))
    toast({
      title: "Usuário excluído",
      description: "O usuário foi excluído com sucesso.",
    })
  }

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case "admin":
        return "default"
      case "organizador":
        return "outline"
      case "participante":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar usuários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Função" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role} value={role}>
                {role === "admin"
                  ? "Administrador"
                  : role === "organizador"
                    ? "Organizador"
                    : role === "participante"
                      ? "Participante"
                      : role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Nenhum usuário encontrado.</p>
        </div>
      ) : (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead className="hidden md:table-cell">Eventos</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground md:hidden">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {user.role === "admin"
                          ? "Administrador"
                          : user.role === "organizador"
                            ? "Organizador"
                            : "Participante"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-col">
                        <span>Criados: {user.eventsCreated}</span>
                        <span>Participando: {user.eventsParticipating}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => onEdit(user)}>
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
                              <AlertDialogTitle>Excluir usuário</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir o usuário "{user.name}"? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(user.id)}
                                className="bg-destructive text-destructive-foreground"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

