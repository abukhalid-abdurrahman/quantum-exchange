import Overview from "@/app/(main)/rwa/[id]/components/tabs/Overview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RwaTabs({ rwa }: { rwa: any }) {
  return (
    <Tabs defaultValue="overview" className="w-full mt-[70px]">
      <div className="w-full relative mb-7.5 after:absolute after:bottom-0 after:-z-10 after:left-0 after:w-full after:h-px after:bg-muted/50">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
          <TabsTrigger value="tokenDetails">Token details</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="overview">
        <Overview rwa={rwa} />
      </TabsContent>
      <TabsContent value="characteristics">
        Change your password here.
      </TabsContent>
      <TabsContent value="tokenDetails">Change your password here.</TabsContent>
    </Tabs>
  );
}
