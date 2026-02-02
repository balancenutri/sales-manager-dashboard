import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import type { NutripreneurEnquires } from "@/lib/types";
import {
  useAddCommentToNutripreneurEnquiresMutation,
  useGetNutripreneurEnquiresQuery,
} from "@/service/dashboard/api";
import { toast } from "sonner";

export default function NutripreneurEnquires() {
  const { data } = useGetNutripreneurEnquiresQuery();
  const [addComment] = useAddCommentToNutripreneurEnquiresMutation();

  // Track comments per row
  const [comments, setComments] = useState<{ [key: number]: string }>({});

  const handleAddComment = async (id: number) => {
    const comment = comments[id];
    if (!comment) {
      toast.error("Please enter a comment");
      return;
    }

    try {
      await addComment({ body: { comment }, id }).unwrap();
      toast.success("Comment added successfully!");
      // Clear the textbox
      setComments((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      toast.error("Failed to add comment");
      console.error(error);
    }
  };

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sr. No.</TableHead>
            <TableHead>User Details</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Occupation</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.isArray(data?.data) && data.data.length > 0 ? (
            data.data.map((item: NutripreneurEnquires, idx: number) => (
              <TableRow key={item.id} className="align-top">
                <TableCell>{idx + 1}</TableCell>

                <TableCell className="whitespace-normal">
                  <p>
                    <strong>{item.full_name}</strong>
                  </p>
                  <p>{item.phone_number}</p>
                </TableCell>

                <TableCell className="whitespace-normal">
                  <p>{item.city}</p>
                </TableCell>

                <TableCell className="whitespace-normal">
                  <p>{item.occupation}</p>
                </TableCell>

                <TableCell className="whitespace-normal">
                  <p>{item.comment || "N/A"}</p>
                </TableCell>

                <TableCell className="space-y-2">
                  <Textarea
                    placeholder="Add Comments"
                    className="w-48"
                    value={comments[item.id] || ""}
                    onChange={(e) =>
                      setComments((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                  />
                  <Button onClick={() => handleAddComment(item.id)}>
                    Add Comment
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-24 text-center text-muted-foreground"
              >
                Franchise Not Found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
