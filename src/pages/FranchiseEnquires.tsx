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
import type { FranchiseEnquiry } from "@/lib/types";
import {
  useAddCommentToFranchiseEnquiresMutation,
  useGetFranchiseEnquiresQuery,
} from "@/service/dashboard/api";
import { toast } from "sonner";

export default function FranchiseEnquires() {
  const { data } = useGetFranchiseEnquiresQuery();
  const [addComment] = useAddCommentToFranchiseEnquiresMutation();

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
            <TableHead>Address</TableHead>
            <TableHead>Background</TableHead>
            <TableHead>Franchise Details</TableHead>
            <TableHead>Motivation & Interest</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.isArray(data?.data) && data.data.length > 0 ? (
            data.data.map((item: FranchiseEnquiry, idx: number) => (
              <TableRow key={item.id} className="align-top">
                <TableCell>{idx + 1}</TableCell>

                <TableCell className="whitespace-normal">
                  <p>
                    <strong>{item.name}</strong>
                  </p>
                  <p>{item.email}</p>
                  <p>{item.phone}</p>
                </TableCell>

                <TableCell className="whitespace-normal">
                  <p>{item.address}</p>
                  <p>
                    {item.city}, {item.state}, {item.pincode}
                  </p>
                  <p>{item.country}</p>
                </TableCell>

                <TableCell className="whitespace-normal">
                  <p>{item.background}</p>
                </TableCell>

                <TableCell className="whitespace-normal">
                  <p>
                    <strong>Franchise Location:</strong>{" "}
                    {item.franchise_location}
                  </p>
                  <p>
                    <strong>Place/Rent Plan:</strong>{" "}
                    {item.have_place_or_rent_plan}
                  </p>
                  <p>
                    <strong>Investment:</strong> ₹
                    {item.investment_amount_in_lacs} Lacs
                  </p>
                </TableCell>

                <TableCell className="whitespace-normal">
                  <p>
                    <strong>Motivation:</strong> {item.franchise_motivation}
                  </p>
                  <p>
                    <strong>Industry Interest:</strong> {item.industry_interest}
                  </p>
                  <p>
                    <strong>Reason:</strong> {item.interest_reason}
                  </p>
                  {item.comment && (
                    <p>
                      <strong>Comment:</strong> {item.comment}
                    </p>
                  )}
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
