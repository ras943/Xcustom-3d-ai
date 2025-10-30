import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AiAgent {
  name: string;
  role: string;
  description: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-ai-workflow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-workflow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiWorkflowComponent {
  aiTeam = signal<AiAgent[]>([
    {
      name: 'Sarah - The Visionary Architect',
      role: 'Chief Design Officer',
      description: 'Sarah takes your initial idea and transforms it into a detailed, printable 3D concept. She uses advanced generative models to create both the visual representation and the technical specifications.',
      icon: 'fa-lightbulb',
      color: 'text-fuchsia-400'
    },
    {
      name: 'Orion - The Precision Engineer',
      role: 'Structural Integrity Analyst',
      description: 'Orion analyzes Sarah\'s designs for printability, structural integrity, and material efficiency. It identifies potential weak points and suggests optimizations to ensure a flawless print.',
      icon: 'fa-drafting-compass',
      color: 'text-cyan-400'
    },
    {
      name: 'Helios - The Production Planner',
      role: 'Logistics & Operations Coordinator',
      description: 'Helios slices the final 3D model, optimizes printing parameters (like temperature and speed), and schedules the job on our printer farm for maximum efficiency and speed.',
      icon: 'fa-cogs',
      color: 'text-amber-400'
    },
    {
      name: 'Athena - The Quality Guardian',
      role: 'Final Inspection & Assurance',
      description: 'Athena performs a final virtual and physical check on the printed object, comparing it against the original design to ensure perfect accuracy, quality, and finish before it\'s shipped.',
      icon: 'fa-shield-alt',
      color: 'text-emerald-400'
    }
  ]);
}
