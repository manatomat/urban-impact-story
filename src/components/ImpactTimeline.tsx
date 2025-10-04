import { Card } from "@/components/ui/card";
import { Clock, AlertTriangle, Home, Heart, TrendingUp } from "lucide-react";

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  severity: "critical" | "high" | "medium" | "recovery";
}

interface ImpactTimelineProps {
  casualties: number;
  injured: number;
  affectedPopulation: number;
  economicDamage: number;
}

const ImpactTimeline = ({ casualties, injured, affectedPopulation, economicDamage }: ImpactTimelineProps) => {
  const formatDamage = economicDamage >= 1000 
    ? `$${(economicDamage / 1000).toFixed(2)} trillion` 
    : `$${economicDamage.toFixed(2)} billion`;

  const events: TimelineEvent[] = [
    {
      time: "T+0 seconds",
      title: "Impact",
      description: `Asteroid strikes with devastating force. Immediate vaporization creates a blast crater. Shockwave propagates outward at supersonic speeds, carrying **${Math.floor(casualties * 0.4).toLocaleString()}** instant fatalities in the total destruction zone.`,
      icon: <AlertTriangle className="h-5 w-5" />,
      severity: "critical"
    },
    {
      time: "T+1 minute",
      title: "Initial Destruction Wave",
      description: `Blast wave reaches severe destruction radius. Buildings collapse killing **${Math.floor(casualties * 0.35).toLocaleString()}** more people. Firestorms ignite across impact zone. **${Math.floor(injured * 0.3).toLocaleString()}** people sustain critical injuries from flying debris and structural collapse.`,
      icon: <AlertTriangle className="h-5 w-5" />,
      severity: "critical"
    },
    {
      time: "T+10 minutes",
      title: "Secondary Effects Cascade",
      description: `Fires spread rapidly through damaged structures. Infrastructure failures cascade across power, water, and communications networks. Emergency services overwhelmed with **${Math.floor(injured * 0.5).toLocaleString()}** injured requiring immediate medical attention. Additional **${Math.floor(casualties * 0.15).toLocaleString()}** deaths from building collapses and fires.`,
      icon: <AlertTriangle className="h-5 w-5" />,
      severity: "critical"
    },
    {
      time: "T+1 hour",
      title: "Regional Impact Expands",
      description: `Dust cloud rises **15-20 miles** into atmosphere. Moderate and mild damage zones fully impacted. Roads impassable with debris. Hospitals at **300%** capacity, unable to treat **${Math.floor(injured * 0.7).toLocaleString()}** wounded. Final death toll from immediate impact reaches **${casualties.toLocaleString()}**.`,
      icon: <Home className="h-5 w-5" />,
      severity: "high"
    },
    {
      time: "T+6 hours",
      title: "Emergency Response Mobilization",
      description: `Federal disaster declaration issued. National Guard deploying **15,000** troops to affected region. Search and rescue operations begin in accessible outer zones. **${Math.floor(affectedPopulation * 0.4).toLocaleString()}** people confirmed displaced and seeking shelter.`,
      icon: <Heart className="h-5 w-5" />,
      severity: "high"
    },
    {
      time: "T+1 day",
      title: "Humanitarian Crisis Escalates",
      description: `**${Math.floor(affectedPopulation * 0.6).toLocaleString()}** people displaced from homes. Temporary shelters established for **${Math.floor(affectedPopulation * 0.35).toLocaleString()}** survivors. Critical medical supply shortages. Water contamination affects **${Math.floor(affectedPopulation * 0.8).toLocaleString()}** people. Secondary deaths from untreated injuries reach **${Math.floor(casualties * 0.08).toLocaleString()}**.`,
      icon: <Heart className="h-5 w-5" />,
      severity: "high"
    },
    {
      time: "T+1 week",
      title: "Atmospheric Effects Intensify",
      description: `Dust and debris in atmosphere blocking **30-40%** of sunlight across **${Math.floor(affectedPopulation / 50000)} state** region. Temperature drops by **7°F** regionally. Agricultural impact begins affecting food supply chains. Supply chain disruptions cost **$${Math.floor(economicDamage * 0.15).toFixed(1)} billion** in first week.`,
      icon: <AlertTriangle className="h-5 w-5" />,
      severity: "medium"
    },
    {
      time: "T+1 month",
      title: "Economic Shockwave",
      description: `Financial markets react with **$${Math.floor(economicDamage * 0.3).toFixed(1)} billion** in immediate losses. Insurance claims processing begins for **${Math.floor(affectedPopulation * 0.25).toLocaleString()}** affected properties. Regional unemployment spikes by **${Math.floor((casualties + injured) * 2).toLocaleString()}** jobs lost. Reconstruction cost estimates reach **${formatDamage}**.`,
      icon: <TrendingUp className="h-5 w-5" />,
      severity: "medium"
    },
    {
      time: "T+3 months",
      title: "Early Recovery Phase Begins",
      description: `Debris removal ongoing, **${Math.floor(casualties * 0.5).toLocaleString()}** bodies still unrecovered. Temporary infrastructure restored in outer zones serving **${Math.floor(affectedPopulation * 0.4).toLocaleString()}** people. Population resettlement programs established. **${Math.floor(affectedPopulation * 0.55).toLocaleString()}** people still in temporary housing.`,
      icon: <Home className="h-5 w-5" />,
      severity: "recovery"
    },
    {
      time: "T+6 months",
      title: "Reconstruction Accelerates",
      description: `Major reconstruction contracts awarded totaling **$${Math.floor(economicDamage * 0.4).toFixed(1)} billion**. Power grid **40%** restored. **${Math.floor(affectedPopulation * 0.12).toLocaleString()}** students return to reopened schools in unaffected areas. Economic activity at **35%** of pre-impact levels, still **$${Math.floor(economicDamage * 0.45).toFixed(1)} billion** below normal.`,
      icon: <TrendingUp className="h-5 w-5" />,
      severity: "recovery"
    },
    {
      time: "T+1 year",
      title: "Long-term Recovery Continues",
      description: `**30%** of damaged infrastructure rebuilt. **${Math.floor(affectedPopulation * 0.35).toLocaleString()}** people resettled into permanent housing. Economic activity recovers to **60%** of pre-impact levels. Environmental cleanup continues with **${formatDamage}** spent on recovery. Death toll from long-term health effects reaches **${Math.floor(casualties * 1.12).toLocaleString()}**. Full recovery estimated to take **10-15 years**.`,
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

  // Helper function to bold numbers in descriptions
  const renderDescription = (description: string) => {
    const parts = description.split(/(\*\*.*?\*\*)/g);
    return (
      <>
        {parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <span key={index} className="font-bold text-foreground">{part.slice(2, -2)}</span>;
          }
          return part;
        })}
      </>
    );
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
        Detailed sequence of events following asteroid impact over a 12-month period, with projected casualties and economic losses
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
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {renderDescription(event.description)}
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
