import { Card } from "@/components/ui/card";
import { Clock, AlertTriangle, Home, Heart, TrendingUp } from "lucide-react";

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  severity: "critical" | "high" | "medium" | "recovery";
}

const ImpactTimeline = () => {
  const events: TimelineEvent[] = [
    {
      time: "T+0 seconds",
      title: "Impact",
      description: "Asteroid strikes with devastating force. Immediate vaporization at ground zero. Shockwave begins propagating.",
      icon: <AlertTriangle className="h-5 w-5" />,
      severity: "critical"
    },
    {
      time: "T+1 minute",
      title: "Initial Destruction Wave",
      description: "Blast wave reaches maximum casualties zone. Buildings within total destruction radius collapse. Firestorms ignite.",
      icon: <AlertTriangle className="h-5 w-5" />,
      severity: "critical"
    },
    {
      time: "T+10 minutes",
      title: "Secondary Effects Cascade",
      description: "Fires spread rapidly. Infrastructure failures across power, water, and communications. Emergency services overwhelmed.",
      icon: <AlertTriangle className="h-5 w-5" />,
      severity: "critical"
    },
    {
      time: "T+1 hour",
      title: "Regional Impact",
      description: "Dust cloud begins rising. Severe destruction zone fully impacted. Roads impassable. Hospitals at capacity.",
      icon: <Home className="h-5 w-5" />,
      severity: "high"
    },
    {
      time: "T+6 hours",
      title: "Emergency Response Mobilization",
      description: "Federal disaster declaration. National Guard deployed. Search and rescue operations begin in accessible areas.",
      icon: <Heart className="h-5 w-5" />,
      severity: "high"
    },
    {
      time: "T+1 day",
      title: "Humanitarian Crisis",
      description: "Millions displaced. Temporary shelters established. Medical supply shortages. Water contamination widespread.",
      icon: <Heart className="h-5 w-5" />,
      severity: "high"
    },
    {
      time: "T+1 week",
      title: "Atmospheric Effects",
      description: "Dust and debris in atmosphere causing regional temperature drops. Agricultural impact begins. Supply chain disruptions.",
      icon: <AlertTriangle className="h-5 w-5" />,
      severity: "medium"
    },
    {
      time: "T+1 month",
      title: "Economic Shockwave",
      description: "Markets react. Insurance claims processing. Unemployment spikes. Reconstruction planning begins.",
      icon: <TrendingUp className="h-5 w-5" />,
      severity: "medium"
    },
    {
      time: "T+3 months",
      title: "Early Recovery Phase",
      description: "Debris removal ongoing. Temporary infrastructure restored in outer zones. Population resettlement programs established.",
      icon: <Home className="h-5 w-5" />,
      severity: "recovery"
    },
    {
      time: "T+6 months",
      title: "Reconstruction Begins",
      description: "Major reconstruction contracts awarded. Power grid partially restored. Schools reopen in unaffected areas.",
      icon: <TrendingUp className="h-5 w-5" />,
      severity: "recovery"
    },
    {
      time: "T+1 year",
      title: "Long-term Recovery",
      description: "30% of damaged infrastructure rebuilt. Economic activity at 60% of pre-impact levels. Environmental cleanup continues.",
      icon: <TrendingUp className="h-5 w-5" />,
      severity: "recovery"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-danger bg-danger/10";
      case "high":
        return "border-warning bg-warning/10";
      case "medium":
        return "border-info bg-info/10";
      case "recovery":
        return "border-success bg-success/10";
      default:
        return "border-border bg-card";
    }
  };

  const getIconColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-danger";
      case "high":
        return "text-warning";
      case "medium":
        return "text-info";
      case "recovery":
        return "text-success";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="h-6 w-6 text-primary" />
        <h3 className="text-2xl font-bold text-foreground">
          Impact Timeline: First Year
        </h3>
      </div>
      <p className="text-muted-foreground mb-6">
        Projected sequence of events following asteroid impact over a 12-month period
      </p>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
        
        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={index} className="relative flex gap-4">
              {/* Icon */}
              <div className={`flex-shrink-0 w-16 h-16 rounded-full border-2 ${getSeverityColor(event.severity)} flex items-center justify-center z-10`}>
                <div className={getIconColor(event.severity)}>
                  {event.icon}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 pb-6">
                <div className={`p-4 rounded-lg border ${getSeverityColor(event.severity)}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      {event.time}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2">
                    {event.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ImpactTimeline;
