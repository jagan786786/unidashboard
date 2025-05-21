"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Calendar,
  Clock,
  FileText,
  Bell,
  BarChart3,
  Users,
  Wallet,
  GraduationCap,
  BookMarked,
  Building,
  Bus,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";

export function AdminDashboard() {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="users">User Management</TabsTrigger>
        <TabsTrigger value="facilities">Facilities</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,238</div>
              <p className="text-xs text-muted-foreground">
                +12% from last year
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Faculty Members
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">312</div>
              <p className="text-xs text-muted-foreground">
                +5% from last year
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Courses
              </CardTitle>
              <BookMarked className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">187</div>
              <p className="text-xs text-muted-foreground">
                Spring 2025 Semester
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4.2M</div>
              <p className="text-xs text-muted-foreground">
                +8% from last quarter
              </p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="users">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage students, faculty, and staff accounts
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Export</Button>
              <Button>Add User</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="students" className="space-y-4">
              <TabsList>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="faculty">Faculty</TabsTrigger>
              </TabsList>

              <TabsContent value="students" className="space-y-4">
                <div className="rounded-lg border">
                  <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                    <div>Name</div>
                    <div>ID</div>
                    <div>Department</div>
                    <div>Year</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>
                  {[
                    {
                      name: "Alex Johnson",
                      id: "STU123456",
                      department: "Computer Science",
                      year: "3rd",
                      status: "Active",
                    },
                    {
                      name: "Emily Chen",
                      id: "STU234567",
                      department: "Engineering",
                      year: "2nd",
                      status: "Active",
                    },
                    {
                      name: "Michael Brown",
                      id: "STU345678",
                      department: "Business",
                      year: "4th",
                      status: "Active",
                    },
                    {
                      name: "Sarah Williams",
                      id: "STU456789",
                      department: "Arts",
                      year: "1st",
                      status: "Active",
                    },
                    {
                      name: "David Lee",
                      id: "STU567890",
                      department: "Medicine",
                      year: "3rd",
                      status: "On Leave",
                    },
                    {
                      name: "Jennifer Kim",
                      id: "STU678901",
                      department: "Computer Science",
                      year: "2nd",
                      status: "Active",
                    },
                    {
                      name: "Robert Johnson",
                      id: "STU789012",
                      department: "Engineering",
                      year: "4th",
                      status: "Active",
                    },
                    {
                      name: "Lisa Wang",
                      id: "STU890123",
                      department: "Business",
                      year: "1st",
                      status: "Inactive",
                    },
                  ].map((student, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-6 gap-4 p-4 border-b last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={`/placeholder.svg?height=32&width=32&text=${student.name.charAt(
                              0
                            )}`}
                          />
                          <AvatarFallback>
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{student.name}</span>
                      </div>
                      <div className="flex items-center">{student.id}</div>
                      <div className="flex items-center">
                        {student.department}
                      </div>
                      <div className="flex items-center">{student.year}</div>
                      <div className="flex items-center">
                        <Badge
                          variant={
                            student.status === "Active"
                              ? "default"
                              : student.status === "On Leave"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {student.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <Button variant="outline">Load More</Button>
                </div>
              </TabsContent>

              <TabsContent value="faculty" className="space-y-4">
                <div className="rounded-lg border">
                  <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                    <div>Name</div>
                    <div>ID</div>
                    <div>Department</div>
                    <div>Position</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>
                  {[
                    {
                      name: "Dr. Jane Smith",
                      id: "FAC123456",
                      department: "Computer Science",
                      position: "Professor",
                      status: "Active",
                    },
                    {
                      name: "Prof. Robert Johnson",
                      id: "FAC234567",
                      department: "Engineering",
                      position: "Associate Professor",
                      status: "Active",
                    },
                    {
                      name: "Dr. Michael Brown",
                      id: "FAC345678",
                      department: "Business",
                      position: "Assistant Professor",
                      status: "Active",
                    },
                    {
                      name: "Prof. Sarah Williams",
                      id: "FAC456789",
                      department: "Arts",
                      position: "Professor",
                      status: "On Leave",
                    },
                    {
                      name: "Dr. David Lee",
                      id: "FAC567890",
                      department: "Medicine",
                      position: "Professor",
                      status: "Active",
                    },
                    {
                      name: "Prof. Jennifer Kim",
                      id: "FAC678901",
                      department: "Computer Science",
                      position: "Assistant Professor",
                      status: "Active",
                    },
                  ].map((faculty, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-6 gap-4 p-4 border-b last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={`/placeholder.svg?height=32&width=32&text=${faculty.name.charAt(
                              0
                            )}`}
                          />
                          <AvatarFallback>
                            {faculty.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{faculty.name}</span>
                      </div>
                      <div className="flex items-center">{faculty.id}</div>
                      <div className="flex items-center">
                        {faculty.department}
                      </div>
                      <div className="flex items-center">
                        {faculty.position}
                      </div>
                      <div className="flex items-center">
                        <Badge
                          variant={
                            faculty.status === "Active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {faculty.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="facilities">
        <Card>
          <CardHeader>
            <CardTitle>Facilities Management</CardTitle>
            <CardDescription>
              Manage university buildings, classrooms, and resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="buildings" className="space-y-4">
              <TabsList>
                <TabsTrigger value="buildings">Buildings</TabsTrigger>
                <TabsTrigger value="classrooms">Classrooms</TabsTrigger>
                <TabsTrigger value="hostel">Hostel</TabsTrigger>
                <TabsTrigger value="transport">Transport</TabsTrigger>
              </TabsList>

              <TabsContent value="buildings" className="space-y-4">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      name: "Main Building",
                      floors: 5,
                      rooms: 120,
                      status: "Operational",
                    },
                    {
                      name: "Science Building",
                      floors: 4,
                      rooms: 80,
                      status: "Operational",
                    },
                    {
                      name: "Engineering Block",
                      floors: 6,
                      rooms: 150,
                      status: "Operational",
                    },
                    {
                      name: "Library",
                      floors: 3,
                      rooms: 40,
                      status: "Maintenance",
                    },
                    {
                      name: "Student Center",
                      floors: 2,
                      rooms: 30,
                      status: "Operational",
                    },
                    {
                      name: "Administration Building",
                      floors: 4,
                      rooms: 60,
                      status: "Operational",
                    },
                  ].map((building, i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="aspect-video bg-muted relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Building className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                      </div>
                      <CardHeader className="p-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {building.name}
                          </CardTitle>
                          <Badge
                            variant={
                              building.status === "Operational"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {building.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Floors</p>
                            <p className="font-medium">{building.floors}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Rooms</p>
                            <p className="font-medium">{building.rooms}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="classrooms" className="space-y-4">
                <div className="rounded-lg border">
                  <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                    <div>Room</div>
                    <div>Building</div>
                    <div>Capacity</div>
                    <div>Type</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>
                  {[
                    {
                      room: "101",
                      building: "Main Building",
                      capacity: 40,
                      type: "Lecture Hall",
                      status: "Available",
                    },
                    {
                      room: "201",
                      building: "Science Building",
                      capacity: 30,
                      type: "Lab",
                      status: "In Use",
                    },
                    {
                      room: "302",
                      building: "Engineering Block",
                      capacity: 60,
                      type: "Lecture Hall",
                      status: "Available",
                    },
                    {
                      room: "105",
                      building: "Main Building",
                      capacity: 25,
                      type: "Seminar Room",
                      status: "Maintenance",
                    },
                    {
                      room: "205",
                      building: "Science Building",
                      capacity: 35,
                      type: "Lab",
                      status: "Available",
                    },
                    {
                      room: "310",
                      building: "Engineering Block",
                      capacity: 20,
                      type: "Conference Room",
                      status: "In Use",
                    },
                  ].map((classroom, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-6 gap-4 p-4 border-b last:border-0"
                    >
                      <div className="flex items-center">{classroom.room}</div>
                      <div className="flex items-center">
                        {classroom.building}
                      </div>
                      <div className="flex items-center">
                        {classroom.capacity}
                      </div>
                      <div className="flex items-center">{classroom.type}</div>
                      <div className="flex items-center">
                        <Badge
                          variant={
                            classroom.status === "Available"
                              ? "default"
                              : classroom.status === "In Use"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {classroom.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Schedule
                        </Button>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="hostel" className="space-y-4">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      name: "Hostel A",
                      rooms: 100,
                      occupancy: 92,
                      gender: "Male",
                    },
                    {
                      name: "Hostel B",
                      rooms: 100,
                      occupancy: 88,
                      gender: "Female",
                    },
                    {
                      name: "Hostel C",
                      rooms: 80,
                      occupancy: 75,
                      gender: "Male",
                    },
                    {
                      name: "Hostel D",
                      rooms: 80,
                      occupancy: 78,
                      gender: "Female",
                    },
                    {
                      name: "International House",
                      rooms: 50,
                      occupancy: 45,
                      gender: "Mixed",
                    },
                    {
                      name: "Graduate Residence",
                      rooms: 60,
                      occupancy: 52,
                      gender: "Mixed",
                    },
                  ].map((hostel, i) => (
                    <Card key={i}>
                      <CardHeader className="pb-2">
                        <CardTitle>{hostel.name}</CardTitle>
                        <CardDescription>
                          {hostel.gender} Hostel
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Occupancy</span>
                              <span>
                                {hostel.occupancy}/{hostel.rooms} rooms
                              </span>
                            </div>
                            <Progress
                              value={(hostel.occupancy / hostel.rooms) * 100}
                            />
                          </div>
                          <div className="flex justify-between">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button size="sm">Manage</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="transport" className="space-y-4">
                <div className="rounded-lg border">
                  <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                    <div>Vehicle</div>
                    <div>Type</div>
                    <div>Capacity</div>
                    <div>Route</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>
                  {[
                    {
                      vehicle: "Bus 01",
                      type: "Bus",
                      capacity: 40,
                      route: "Campus - Downtown",
                      status: "In Service",
                    },
                    {
                      vehicle: "Bus 02",
                      type: "Bus",
                      capacity: 40,
                      route: "Campus - North Residence",
                      status: "In Service",
                    },
                    {
                      vehicle: "Bus 03",
                      type: "Bus",
                      capacity: 40,
                      route: "Campus - South Residence",
                      status: "In Service",
                    },
                    {
                      vehicle: "Van 01",
                      type: "Van",
                      capacity: 12,
                      route: "Special Services",
                      status: "Available",
                    },
                    {
                      vehicle: "Van 02",
                      type: "Van",
                      capacity: 12,
                      route: "Faculty Transport",
                      status: "In Service",
                    },
                    {
                      vehicle: "Car 01",
                      type: "Car",
                      capacity: 5,
                      route: "Administrative Use",
                      status: "Maintenance",
                    },
                  ].map((vehicle, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-6 gap-4 p-4 border-b last:border-0"
                    >
                      <div className="flex items-center">{vehicle.vehicle}</div>
                      <div className="flex items-center">{vehicle.type}</div>
                      <div className="flex items-center">
                        {vehicle.capacity}
                      </div>
                      <div className="flex items-center">{vehicle.route}</div>
                      <div className="flex items-center">
                        <Badge
                          variant={
                            vehicle.status === "In Service"
                              ? "default"
                              : vehicle.status === "Available"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {vehicle.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Schedule
                        </Button>
                        <Button variant="ghost" size="sm">
                          Track
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
