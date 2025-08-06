import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockData } from "@/lib/data";
import {
  Award,
  Book,
  BookOpen,
  ClipboardList,
  CreditCard,
  UsersRound,
  Utensils,
  Video,
} from "lucide-react";
export default function ContentManagement() {
  return (
    <div>
      <h2 className="text-2xl font-bold my-4">Content Engagement</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Visits</CardTitle>
            <CardDescription>
              User engagement with various content types
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-2">
                <ClipboardList className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Tips Visit</span>
              </div>
              <span className="font-semibold text-red-500">
                {mockData.appAnalytics.tipsVisit.day} |{" "}
                {mockData.appAnalytics.tipsVisit.mtd}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-2">
                <Video className="h-4 w-4 text-purple-500" />
                <span className="font-medium">Video Visits</span>
              </div>
              <span className="font-semibold text-red-500">
                {mockData.appAnalytics.videoVisits.day} |{" "}
                {mockData.appAnalytics.videoVisits.mtd}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-orange-500" />
                <span className="font-medium">Recipe Visits</span>
              </div>
              <span className="font-semibold text-red-500">
                {mockData.appAnalytics.recipeVisits.day} |{" "}
                {mockData.appAnalytics.recipeVisits.mtd}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">Success Stories Visits</span>
              </div>
              <span className="font-semibold text-red-500">
                {mockData.appAnalytics.successStoriesVisits.day} |{" "}
                {mockData.appAnalytics.successStoriesVisits.mtd}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 text-green-500" />
                <span className="font-medium">Wallet Visits</span>
              </div>
              <span className="font-semibold text-red-500">
                {mockData.appAnalytics.walletVisits.day} |{" "}
                {mockData.appAnalytics.walletVisits.mtd}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Guide & Book Interactions</CardTitle>
            <CardDescription>
              User interactions with guides and recipe books
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-2">
                <Book className="h-4 w-4 text-red-500" />
                <span className="font-medium">Alcohol Guide Filled</span>
              </div>
              <span className="font-semibold text-red-500">
                {mockData.appAnalytics.alcoholGuideFilled.day} |{" "}
                {mockData.appAnalytics.alcoholGuideFilled.mtd}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-2">
                <Utensils className="h-4 w-4 text-brown-500" />
                <span className="font-medium">Restaurant Guide Filled</span>
              </div>
              <span className="font-semibold text-red-500">
                {mockData.appAnalytics.restaurantGuideFilled.day} |{" "}
                {mockData.appAnalytics.restaurantGuideFilled.mtd}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-teal-500" />
                <span className="font-medium">Recipe Book Created</span>
              </div>
              <span className="font-semibold text-red-500">
                {mockData.appAnalytics.recipeBookCreated.day} |{" "}
                {mockData.appAnalytics.recipeBookCreated.mtd}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <UsersRound className="h-4 w-4 text-indigo-500" />
                <span className="font-medium">Peer Group Visit</span>
              </div>
              <span className="font-semibold text-red-500">
                {mockData.appAnalytics.peerGroupVisit.day} |{" "}
                {mockData.appAnalytics.peerGroupVisit.mtd}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
