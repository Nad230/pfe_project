// components/projects/add-team-dialog.tsx
"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import Cookies from "js-cookie";
import { X, Check } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";

interface User {
  id: string;
  fullname: string;
  email: string;
  profile_photo?: string;
}

interface AddTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTeamCreated: (teamData: { name: string; description: string; members: string[] }) => void;
  projectId: string;
}

export function AddTeamDialog({ open, onOpenChange, onTeamCreated, projectId }: AddTeamDialogProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) throw new Error("No authentication token found");

        const response = await fetch("http://localhost:3000/auth/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (open) fetchUsers();
  }, [open]);

  const handleCreateTeam = () => {
    if (selectedMembers.length === 0) return;
    setShowDetailsDialog(true);
  };

  const confirmTeamCreation = () => {
    onTeamCreated({
      name: teamName,
      description: teamDescription,
      members: selectedMembers
    });
    setShowDetailsDialog(false);
    onOpenChange(false);
  };

  const filteredUsers = users.filter(user => {
    const userName = user.fullname?.toLowerCase() ?? "";
    const searchTerm = searchQuery.toLowerCase().trim();
    return userName.includes(searchTerm);
  });

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Team</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {selectedMembers.map(userId => {
                const user = users.find(u => u.id === userId);
                return (
                  <Badge key={userId} variant="secondary" className="pl-1 pr-2 bg-blue-100 border-blue-200">
                    <Avatar className="h-6 w-6 mr-1">
                      <AvatarImage src={user?.profile_photo} />
                      <AvatarFallback className="bg-blue-500 text-white">
                        {user?.fullname?.[0]?.toUpperCase() ?? "?"}
                      </AvatarFallback>
                    </Avatar>
                    {user?.fullname}
                    <X
                      className="ml-1 h-3 w-3 cursor-pointer text-blue-600 hover:text-blue-800"
                      onClick={() => setSelectedMembers(prev => prev.filter(id => id !== userId))}
                    />
                  </Badge>
                );
              })}
            </div>

            <Command>
              <CommandInput
                placeholder="Search team members..."
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <ScrollArea className="h-64">
                <CommandList>
                  <CommandEmpty>No users found</CommandEmpty>
                  <CommandGroup>
                    {filteredUsers.map(user => (
                     <CommandItem
                     key={user.id}
                     value={user.id} // Add this line
                     onSelect={() => {
                       setSelectedMembers(prev => 
                         prev.includes(user.id) 
                           ? prev.filter(id => id !== user.id) 
                           : [...prev, user.id]
                       )
                     }}
                     className="cursor-pointer aria-selected:bg-blue-50 aria-selected:text-blue-600 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-2 w-full">
                          <div className="flex-1 flex items-center gap-2">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={user.profile_photo} />
                              <AvatarFallback className="bg-blue-500 text-white">
                                {user.fullname?.[0]?.toUpperCase() ?? "?"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.fullname}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                          {selectedMembers.includes(user.id) && (
                            <Check className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </ScrollArea>
            </Command>

            <DialogFooter>
              <Button 
                onClick={handleCreateTeam}
                disabled={selectedMembers.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                {selectedMembers.length > 0 
                  ? `Create Team (${selectedMembers.length} selected)` 
                  : "Select members to continue"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Team Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Team Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Team Name</Label>
              <Input
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter team name"
              />
            </div>
            <div className="space-y-2">
              <Label>Team Description</Label>
              <Textarea
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
                placeholder="Briefly describe the team's purpose"
              />
            </div>
            <DialogFooter>
              <Button 
                onClick={confirmTeamCreation}
                disabled={!teamName.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Confirm Team Creation
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}