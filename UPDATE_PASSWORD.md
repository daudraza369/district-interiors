# Update Database Password

## Quick Fix

The `.env` file currently has:
```
DATABASE_PASSWORD=postgres
```

But your PostgreSQL password is different. 

## To Fix:

1. **Open:** `apps\cms\.env`
2. **Find the line:** `DATABASE_PASSWORD=postgres`
3. **Replace with your actual password:**
   ```
   DATABASE_PASSWORD=your_actual_password
   ```
4. **Save the file**
5. **Start Strapi again:**
   ```powershell
   cd apps\cms
   npm run develop
   ```

## Don't Know Your Password?

If you forgot the password you set during PostgreSQL installation:

### Option 1: Check pgAdmin
- Open pgAdmin (if installed)
- Right-click on "postgres" user → Properties → Definition tab
- You can see or change the password there

### Option 2: Reset Password
1. Stop PostgreSQL service:
   ```powershell
   Stop-Service postgresql-x64-15
   ```
   (or whatever your service name is - check with `Get-Service -Name "*postgres*"`)

2. Edit `pg_hba.conf`:
   - Location: `C:\Program Files\PostgreSQL\15\data\pg_hba.conf` (or your version)
   - Find line: `host all all 127.0.0.1/32 md5`
   - Change `md5` to `trust`
   - Save file

3. Start PostgreSQL:
   ```powershell
   Start-Service postgresql-x64-15
   ```

4. Connect without password:
   ```powershell
   psql -U postgres
   ```

5. Change password:
   ```sql
   ALTER USER postgres WITH PASSWORD 'postgres';
   \q
   ```

6. Revert `pg_hba.conf` (change `trust` back to `md5`)

7. Restart PostgreSQL

8. Update `.env` with the new password

## After Updating Password

Once the password is correct in `.env`, start Strapi:
```powershell
cd apps\cms
npm run develop
```

Then open: **http://localhost:1337/admin**
















