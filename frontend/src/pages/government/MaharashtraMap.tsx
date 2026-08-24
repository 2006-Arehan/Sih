import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { MaharashtraMap as MapComponent } from '../../components/maps/MaharashtraMap';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DistrictData } from '../../types/district';
import { MAHARASHTRA_DISTRICTS } from '../../data/districts';
import { MapPin, Download, Filter, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GovernmentMapPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData>(MAHARASHTRA_DISTRICTS[0]);

  return (
    <DashboardLayout
      pageTitle="Maharashtra Interactive Skill & Spatial Heatmap"
      pageSubtitle="Comprehensive 36-district geographic demand scoring, seat distribution, and industrial cluster mapping."
      actions={
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/government/districts')}
        >
          View District Analysis Table
        </Button>
      }
    >
      <div className="space-y-6">
        <MapComponent
          selectedDistrictId={selectedDistrict.id}
          onSelectDistrict={(dist) => setSelectedDistrict(dist)}
          heightClass="h-[600px]"
        />
      </div>
    </DashboardLayout>
  );
};
