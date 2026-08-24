import os
import io
from sqlalchemy.orm import Session
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from app.services.district_plan_engine import DistrictPlanEngine

class CabinetNoteGenerator:
    """Generates official Government of Maharashtra District Skill Action Plan Cabinet Note PDFs."""

    @staticmethod
    def generate_cabinet_note_pdf(db: Session, district_name: str) -> bytes:
        plan = DistrictPlanEngine.generate_district_plan(db, district_name)
        buffer = io.BytesIO()

        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            leftMargin=54,
            rightMargin=54,
            topMargin=54,
            bottomMargin=54
        )

        styles = getSampleStyleSheet()
        c_primary = colors.HexColor("#0F2942")
        c_secondary = colors.HexColor("#2B6CB0")
        c_dark = colors.HexColor("#1A202C")

        title_style = ParagraphStyle(
            'CabTitle',
            parent=styles['Heading1'],
            fontName='Helvetica-Bold',
            fontSize=20,
            leading=24,
            textColor=c_primary,
            spaceAfter=4
        )

        subtitle_style = ParagraphStyle(
            'CabSub',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=11,
            leading=15,
            textColor=c_secondary,
            spaceAfter=12
        )

        h1_style = ParagraphStyle(
            'CabH1',
            parent=styles['Heading2'],
            fontName='Helvetica-Bold',
            fontSize=13,
            leading=16,
            textColor=c_primary,
            spaceBefore=12,
            spaceAfter=6
        )

        body_style = ParagraphStyle(
            'CabBody',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=9.5,
            leading=13.5,
            textColor=c_dark,
            spaceAfter=6
        )

        bullet_style = ParagraphStyle(
            'CabBullet',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=9,
            leading=13,
            textColor=c_dark,
            leftIndent=10,
            spaceAfter=4
        )

        elements = []

        # Government Header Block
        elements.append(Paragraph("GOVERNMENT OF MAHARASHTRA", title_style))
        elements.append(Paragraph(f"District Skill Development Committee (DSDC) — {district_name.upper()} DISTRICT", subtitle_style))
        elements.append(Paragraph(f"<b>MEMORANDUM FOR THE DISTRICT CABINET / COLLECTORATE MEETING</b>", ParagraphStyle('SubSub', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10, textColor=colors.HexColor("#C53030"))))
        elements.append(HRFlowable(width="100%", thickness=1.5, color=c_primary, spaceAfter=12))

        # Executive Summary
        elements.append(Paragraph("1. Executive Summary & Market Context", h1_style))
        elements.append(Paragraph(f"This Memorandum presents data-driven labor market analytics for <b>{plan['district']} District</b> ({plan['region']} Region). The platform analyzed <b>{plan['total_demand']} active job postings</b> and <b>{plan['courses_offered']} local training courses</b> to formulate strategic interventions.", body_style))

        # Summary Table
        summary_data = [
            [Paragraph("<b>Metric Parameter</b>", body_style), Paragraph("<b>Statistical Finding</b>", body_style)],
            [Paragraph("Total Active Job Market Postings", body_style), Paragraph(str(plan["total_demand"]), body_style)],
            [Paragraph("Local Vocational Courses Offered", body_style), Paragraph(str(plan["courses_offered"]), body_style)],
            [Paragraph("Identified Industry Skill Gaps", body_style), Paragraph(f"{len(plan['skills_gap'])} Unmet Skill Demands", body_style)],
            [Paragraph("Courses Flagged at Risk (<40% Placement)", body_style), Paragraph(f"{len(plan['courses_at_risk'])} Courses Flagged", body_style)],
        ]
        t_sum = Table(summary_data, colWidths=[240, 264])
        t_sum.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#E2E8F0")),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E0")),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
            ('TOPPADDING', (0, 0), (-1, -1), 4),
        ]))
        elements.append(t_sum)
        elements.append(Spacer(1, 10))

        # Recommendations Section
        elements.append(Paragraph("2. Strategic Policy Recommendations for Approval", h1_style))
        for rec in plan["recommendations"]:
            elements.append(Paragraph(f"• {rec}", bullet_style))

        elements.append(Spacer(1, 14))
        elements.append(Paragraph("<b>Submitted By:</b> State Skill & Labor Market Intelligence System", body_style))
        elements.append(Paragraph("<b>Action Requested:</b> Approval of proposed batch restructuring & new trade budget allocation.", body_style))

        doc.build(elements)
        pdf_data = buffer.getvalue()
        buffer.close()
        return pdf_data
