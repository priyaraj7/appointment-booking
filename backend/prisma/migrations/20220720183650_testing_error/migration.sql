-- CreateTable
CREATE TABLE "DoctorInfo" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "speciality" TEXT NOT NULL,

    CONSTRAINT "DoctorInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "clinicName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "zipCode" INTEGER NOT NULL,
    "doctorInfoId" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insurance" (
    "id" SERIAL NOT NULL,
    "insuranceName" TEXT NOT NULL,

    CONSTRAINT "Insurance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListInsuranceDoctor" (
    "doctorInfoId" INTEGER NOT NULL,
    "insuranceId" INTEGER NOT NULL,

    CONSTRAINT "ListInsuranceDoctor_pkey" PRIMARY KEY ("doctorInfoId","insuranceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "DoctorInfo_email_key" ON "DoctorInfo"("email");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_doctorInfoId_fkey" FOREIGN KEY ("doctorInfoId") REFERENCES "DoctorInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListInsuranceDoctor" ADD CONSTRAINT "ListInsuranceDoctor_doctorInfoId_fkey" FOREIGN KEY ("doctorInfoId") REFERENCES "DoctorInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListInsuranceDoctor" ADD CONSTRAINT "ListInsuranceDoctor_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "Insurance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
